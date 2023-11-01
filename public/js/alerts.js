//type is a either success or error
export const showAlert = (type, message) => {
    const markup  = `<div class="alert alert--${type}"> ${message} </div>`
    document.querySelector("body").insertAdjacentHTML("afterbegin", markup)
}


export const hideAlert = () => {
    hideAlert()
    const el = document.querySelector("alert")
    if(el) el.parentElement.removeChild(el)
    window.setTimeout(hideAlert, 5000)
}