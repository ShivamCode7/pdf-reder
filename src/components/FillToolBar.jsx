import React from 'react'
import { FaRegFileLines } from 'react-icons/fa6'

function FillToolBar() {
    return (
        <div>
            <div>
                <div>
                    <div>
                        <button><FaRegFileLines /></button>
                        <button><FaRegFileLines /></button>
                    </div>
                    <div>
                        <button><FaRegFileLines /></button>
                        <button><FaRegFileLines /></button>
                        <button><FaRegFileLines /></button>
                    </div>
                </div>

                <div>
                    <button><FaRegFileLines /></button>
                </div>

            </div>
        </div>
    )
}

export default FillToolBar