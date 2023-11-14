function GreenButton({label, handleClick}) {
    return (
        <button className="btn sm:btn--small btn--xsmall btn--green" type='submit' onClick={handleClick}> {label} </button>

    )
}

export default GreenButton
