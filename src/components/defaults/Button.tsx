import React from 'react'
import styles from '../../styles/components/defaults/button.module.scss'
import { Button } from '../../types/interfaces'

const Button = ({label, handleClick, disabled}:Button) => {
  return (
    <button disabled={disabled} className={styles.button} onClick={handleClick}>
      {label}
    </button>
  )
}

export default Button
