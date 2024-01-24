import { VscStarEmpty } from "react-icons/vsc";
import { Dispatch, SetStateAction, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineLibraryAdd } from "react-icons/md";
import styles from "@/components/module/TextList.module.css"
import { ProfileDataType } from "@/components/template/AddProfilePage";

type TextListType = {
    title: string,
    profileData: ProfileDataType,
    setProfileData?: Dispatch<SetStateAction<ProfileDataType>>,
    pice: string,
    errors?: Record<string, string>;
    setErrors?: Dispatch<SetStateAction<Record<string, string>>>;
}


function TextList({ title, profileData, setProfileData, pice, errors, setErrors }: TextListType) {
    const arrayType = profileData[pice] as string[];
    const [error, setError] = useState([] as string[])

    const addHandler = () => {
        setProfileData?.({ ...profileData, [pice]: [...profileData[pice] as string[], ""] });
        setError?.([...error as string[], ""])
    }
    
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        const { value } = e.target
        arrayType[index] = value
        setProfileData?.({ ...profileData, [pice]: arrayType });
    }

    const deleteHandler = (index: number) => {
        arrayType.splice(index, 1)
        setProfileData?.({ ...profileData, [pice]: arrayType });
    }

    const exitHandler = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        const { value } = e.target
        const listError = [...error as string[]];
        if (value.length < 3) {
            listError[index] = `Enter at least three characters for the ${pice}`
            setError(listError)
        }
        else {
            listError[index] = ""
            setError(listError)
        }
    }

    return (
        <div className={styles.container}>
            <p>{title}</p>
            {arrayType.map((i, index) => (
                <div className={styles.mainCard} key={index}>
                    <div className={styles.card} >
                        <input
                            type="text"
                            value={i}
                            onChange={(e) => changeHandler(e, index)} onBlur={(e) => exitHandler(e, index)}
                        />
                        <button onClick={() => deleteHandler(index)}>
                            حذف
                            <AiOutlineDelete />
                        </button>
                    </div>
                    {(error[index] || errors?.[pice]) && arrayType[index].length < 3 ?
                        <h6 className={styles.error} >{error[index] || errors?.[pice]?.slice(0, errors?.[pice]?.indexOf(','))}</h6>
                        : <h6 className={styles.error} ></h6>}
                </div>
            ))}
            <button onClick={addHandler}>
                افزودن
                <MdOutlineLibraryAdd />
            </button>
        </div>
    )
}

export default TextList