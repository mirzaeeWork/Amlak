import { Dispatch, SetStateAction } from "react"
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import styles from "@/components/module/CustomDatePicker.module.css";
import { ProfileDataType } from "@/components/template/AddProfilePage";

type CustomDatePickerType = {
  profileData: ProfileDataType,
  setProfileData?: Dispatch<SetStateAction<ProfileDataType>>,
}

//https://shahabyazdi.github.io/react-multi-date-picker/fa/  ==>راهنما نصب تقویم

function CustomDatePicker({ profileData, setProfileData }: CustomDatePickerType) {
  const changeHandler=(e: any)=>{
    const date=new Date(e)
    setProfileData?.({...profileData,constructionDate:date})
  }
  return (
    <div className={styles.container}>
      <p>تاریخ ساخت</p>
      <DatePicker
        calendar={persian}
        locale={persian_fa}
        value={profileData.constructionDate}
        calendarPosition="bottom-right"
        onChange={changeHandler}
      />
    </div>
  )
}

export default CustomDatePicker