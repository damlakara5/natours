function FormGroup({label, handleChange, name, value, inputType, placeholder, minLength}) {
    return (
        <div class="form__group ma-bt-md">
            <label class="form__label" for={name}> {label} </label>
            <input class="form__input" minLength={minLength} placeholder={placeholder}  id={name} type={inputType} value={value} onChange={(e) => handleChange(e.target.value)} required="required" name={name} />
        </div>
    )
}

export default FormGroup
