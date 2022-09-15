export const minLength = min => value => {
    if (value === undefined || value.length < min)
        return `Минимальная длина - ${min}`
    return undefined
}

export const notStartsWith = expression => value => {
    if (value.startsWith(expression))
        return `Выражение не должно начинаться с ${expression}`
    return undefined
}