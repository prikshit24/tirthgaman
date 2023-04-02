export const emailValidate = (field) => {
    if (field === '' || field === undefined || field === null) {
        return (false)
    } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(field)) {
        return (true)
    }
    else {
        return (false)
    }
}

export const validatePassword = (password) => {
    const regex = /^[a-zA-Z0-9!@#$%^&*]{8,25}$/;
    if (regex.test(password) === false) {
        return false
    }
    return true
}