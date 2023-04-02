export const nameValidate = (name) => {
    if (name === null || name === undefined || name === '') {
        return (false)
    } else {
        return (true)
    }
}

export const emailValidate = (field) => {
    if (field !== '') {
        if (/\@/.test(field)) {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(field)) {
                return (true)
            }
            // alert("You have entered an invalid email address!");
            return (false)
        }
    }
    else{
        // alert("Enter email to login")
        return (false)
    }
}

export const phoneValidate = (phone) => {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (phone === null || phone === undefined || phone === '') {
        // alert('Enter Phone Number')
        return (false);
    } else if (phoneno.test(phone)) {
        return (true)
    } else {
        // alert('Enter valid Phone Number')
        return (false)
    }
}