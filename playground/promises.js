const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b);
        }, 2000);
    });
};

add(2, 3).then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
})