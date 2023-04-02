export const signupValidateRole = (role) => {
    console.log('role',role)
    if (role === null || role === undefined || role === '') {
        return (false)
    } else {
        return (true)
    }
}

export const signupValidateFirst = (first) => {
    if (first === null || first === undefined || first === '') {
        // alert('Enter FirstName');
        return (false)
    } else {
        return (true)
    }
}

export const signupValidateLast = (last) => {
    if (last === null || last === undefined || last === '') {
        // alert('Enter LastName');
        return (false)
    } else {
        return (true)
    }
}

export const signupValidateEmail = (email) => {
    if (email === null || email === undefined || email === '') {
        return (false)
    } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false) {
        return (false)
    } else {
        return (true)
    }
}

export const signupValidatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (regex.test(password) === false) {
        // alert('Password must be > 4 Characters, Atleast have one number and one special character should be')
        return false
    }
    return true
}

export const signupValidateCPassword = (field) => {
    if (field.password !== field.confirmPassword) {
        // alert('Confirmpassword and Password are not same')
        return (false)
    } else {
        return (true)
    }
}

export const signupValidatePhone = (phone) => {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (phone === null || phone === undefined || phone === '') {
        // alert('Enter Phone Number')
        return (false);
    } else if (phoneno.test(Number(phone))) {
        return (true)
    } else {
        // alert('Enter valid Phone Number')
        return (false)
    }
}

export const otpValidate = (number) => {
    var regex = /[0-9]{6}/;
    if (number === null || number === undefined || number === '') {
      return (false);
    } else if (number.length < 7) {
      if (regex.test(Number(number))) {
        return (true)
      }
    } else {
      return (false)
    }
  }