const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {

            if (a < 0 || b < 0) {
                reject('Numbers must be non-negative');
            }
            resolve(a + b);
        }, 2000);
    });
};


//if you don't use await, it returns the first completed(if completed) result and the next promise.
//so if you want to put an order the async works and/or their results sequently 'await' keyword needs to be used. 
const doWork = async () => {
    const sum = await add(1, 99); //waits 2 seconds and returns result
    const sum1 = await add(sum, 50); //waits 2 seconds and returns result.
    const sum2 = await add(sum1, 100); //waits 2 seconds and returns result.
    return sum2
}


doWork()
    .then((result) => { console.log('result', result) })
    .catch((error) => { console.log('err', error) })