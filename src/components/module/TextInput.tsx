'use client'
import styles from '@/components/module/TextInput.module.css'
import { Dispatch, SetStateAction, useState } from 'react';
import { ProfileDataType } from '../template/AddProfilePage';
import { p2e, splitIntoThreeDigits } from '@/utils/replaceNumber';
import { validateInput } from '@/validation/Schema/profileSchema';

type TextInputType = {
  title: string,
  name: string,
  profileData: ProfileDataType,
  setProfileData?: Dispatch<SetStateAction<ProfileDataType>>;
  textarea?: boolean,
  errors?: Record<string, string>;
  setErrors?: Dispatch<SetStateAction<Record<string, string>>>;
}


function TextInput({
  title,
  name,
  profileData,
  setProfileData,
  textarea = false,
  errors, setErrors
}: TextInputType) {

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    let mainValue=value
    if (name == "price") mainValue=mainValue.replace(/\D/g, '')
    setProfileData?.({ ...profileData, [name]: p2e(mainValue) });
  }

  const exitHandler = async () => {
    let value = `${profileData[name]}`;
    if (name == "price") value=value.replace(/\D/g, '')
    const errorMessage = validateInput(name, value);
    setErrors?.((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
  }

  const showValue = ():string => {
    if(name == "phone") return profileData[name].replace(/\D/g, '')
    if (name == "price") return splitIntoThreeDigits(profileData[name] as string)
    return profileData[name] as string
  }

  return (
    <div className={styles.container}>
      <p>{title}</p>
      {textarea ?
        <>         <textarea name={name}
          value={profileData[name] as string} onChange={changeHandler} onBlur={exitHandler} />
          <h6 className={styles.error}>{errors?.[name]}</h6>
        </>
        :
        <>
          <input
            name={name}
            value={showValue()} onChange={changeHandler} onBlur={exitHandler} />
          <h6 className={styles.error}>{errors?.[name]}</h6>
        </>}
    </div>
  )
}

export default TextInput