export const validateTempleInputs = (field) => {
    if (field === null || field === undefined || field === '') {
        return (false)
    } else {
        return (true)
    }
}