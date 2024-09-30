import React from 'react'

function InputSection() {
    return (
        <form className='d-flex flex-column' style={{gap: '16px'}}>
            <div className="form-group">
                <label htmlFor="inputQuestion">O que deseja?</label>
                <input type="email" className="form-control" id="inputQuestion" aria-describedby="questionInput" placeholder="Insira a sua pergunta" />
            </div>

            <button type="submit" className="btn btn-primary">Perguntar</button>
        </form>
    )
}

export default InputSection