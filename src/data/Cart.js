export let cart = [{}]

if(!JSON.parse(localStorage.getItem("storage")))
    localStorage.setItem("storage", JSON.stringify([]))

export const addItem = (id) => {
    cart = JSON.parse(localStorage.getItem("storage"))
    let flag = false

    cart.map(elem => {
        if (elem.key === id) {
            elem.value = elem.value + 1
            flag = true
        }
    })
    if(!flag)
        cart.push({
            key: id,
            value: 1
        });

    localStorage.setItem("storage", JSON.stringify(cart))
    // console.log(JSON.parse(localStorage.getItem("storage")))
}
export const removeItem = (id) => {
    cart = JSON.parse(localStorage.getItem("storage"))

    cart.map(elem => {
        if (elem.key === id) {
            elem.value = elem.value - 1
        }
    })

    localStorage.setItem("storage", JSON.stringify(cart))
    // console.log(JSON.parse(localStorage.getItem("storage")))
}
