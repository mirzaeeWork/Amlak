import { Dispatch, SetStateAction } from "react";
import styles from "@/components/module/RadioList.module.css"
import { ProfileDataType } from "@/components/template/AddProfilePage";

type RadioListType = {
    profileData: ProfileDataType,
    setProfileData?: Dispatch<SetStateAction<ProfileDataType>>;
    errors?: Record<string, string>;
}

function RadioList({ profileData, setProfileData, errors }: RadioListType) {
    const { category } = profileData;

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileData?.({ ...profileData, [name]: value });
        errors = errors ?? {};
        errors["category"] = "";
    };

    return (
        <div className={styles.container}>
            <p>دسته بندی</p>
            <div className={styles.main}>
                <div>
                    <input
                        type="radio"
                        name="category"
                        value="villa"
                        id="villa"
                        checked={category === "villa"}
                        onChange={changeHandler}
                    />
                    <label htmlFor="villa">ویلا</label>
                </div>
                <div>
                    <input
                        type="radio"
                        name="category"
                        value="apartment"
                        id="apartment"
                        checked={category === "apartment"}
                        onChange={changeHandler}
                    />
                    <label htmlFor="apartment">آپارتمان</label>
                </div>
                <div>
                    <input
                        type="radio"
                        name="category"
                        value="store"
                        id="store"
                        checked={category === "store"}
                        onChange={changeHandler}
                    />
                    <label htmlFor="store">مغازه</label>
                </div>
                <div>
                    <input
                        type="radio"
                        name="category"
                        value="office"
                        id="office"
                        checked={category === "office"}
                        onChange={changeHandler}
                    />
                    <label htmlFor="office">دفتر</label>
                </div>
            </div>
            <h6 className={styles.error}>{errors?.["category"]}</h6>
        </div>
    );
}

export default RadioList;
