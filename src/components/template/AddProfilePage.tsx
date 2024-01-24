'use client'

import { useEffect, useState } from "react";
import TextInput from "../module/TextInput";
import TextList from "@/components/module/TextList";
import RadioList from "@/components/module/RadioList";
import styles from "@/components/template/AddProfilePage.module.css"
import CustomDatePicker from "@/components/module/CustomDatePicker";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { validateInput } from "@/validation/Schema/profileSchema";
import Loader from "../module/Loader";
import { MyProfilePageType } from "../module/DashboardCard";
import { Types } from "mongoose";


export type ProfileDataType = {
  title: string;//عنوان
  description: string;//توضیحات آن پروژه
  location: string;//مکان آن خانه یا مغازه
  phone: string;//شماره تماس کسی که آگهی میزاره
  price: string;//قیمت ملک
  realState: string;//اطلاعات ملک در کدام املاکی قرار دارد
  constructionDate: Date;//تاریخ ساخت پروژه
  category: string;//در چه دسته بندی قرار دارد مثل ویلا یا خانه
  rules: string[];//قوانین آن ساختمان یا ملک چیست
  amenities: string[];//امکانات رفاهی
  [key: string]: string | Date | string[];
};

function AddProfilePage({ profile }: MyProfilePageType) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [profileData, setProfileData] = useState<ProfileDataType>({
    title: "",
    description: "",
    location: "",
    phone: "",
    price: "",
    realState: "",
    constructionDate: new Date(),
    category: "",
    rules: [],
    amenities: [],
  })

  const router = useRouter();

  useEffect(() => {
    if (profile) {
      const { title, description, location, phone, price, realState,
        constructionDate, category, rules, amenities } = profile
      setProfileData({
        title, description, location, phone, price: price.toString(),
        realState, constructionDate, category, rules, amenities
      })
    }
  }, [])

  const validateForm = () => {
    const formErrors: Record<string, string> = {};

    Object.keys(profileData).forEach((fieldName) => {
      const value = profileData[fieldName] as string;
      const errorMessage = validateInput(fieldName, value);
      if (errorMessage) {
        formErrors[fieldName] = errorMessage;
      }
    });

    setErrors(formErrors);
    // console.log(formErrors)
    return Object.keys(formErrors).length === 0;
  };

  const submitHandler = async () => {
    const isFormValid = validateForm();
    if (isFormValid) {
      setLoading(true);
      const res = await fetch('/api/profile', {
        method: "POST",
        body: JSON.stringify(profileData),
        headers: { "Content-Type": "application/json" },
      })
      setLoading(false);

      const data = await res.json()
      if (data.success) {
        toast.success(data.message);
        router.refresh()
        setTimeout(() => {
          router.push('/dashboard/my-profiles');
        }, 100);
      } else {
        // console.log(data)
        toast.error(data.message || data.messages);
      }
    }
  }

  const editHandler = async () => {
    const isFormValid = validateForm();
    if (isFormValid) {
      setLoading(true);
      // console.log({ profileData })
      const res = await fetch('/api/profile', {
        method: "PATCH",
        body: JSON.stringify({ _id: profile._id, ...profileData }),
        headers: { "Content-Type": "application/json" },
      })
      setLoading(false);

      const data = await res.json()
      if (data.success) {
        toast.success(data.message);
        router.refresh()
        setTimeout(() => {
          router.push('/dashboard/my-profiles');
        }, 100);
      } else {
        // console.log(data)
        toast.error(data.message || data.messages);
      }
    }
  }

  return (
    <div className={styles.container}>
      <h3>{profile ? "ویرایش آگهی" : "ثبت آگهی"}</h3>
      <TextInput
        title="عنوان آگهی"
        name="title"
        profileData={profileData}
        setProfileData={setProfileData}
        errors={errors}
        setErrors={setErrors}
      />
      <TextInput
        title="توضیحات"
        name="description"
        profileData={profileData}
        setProfileData={setProfileData}
        textarea={true}
        errors={errors}
        setErrors={setErrors}
      />
      <TextInput
        title="آدرس"
        name="location"
        profileData={profileData}
        setProfileData={setProfileData}
        errors={errors}
        setErrors={setErrors}
      />
      <TextInput
        title="شماره تماس"
        name="phone"
        profileData={profileData}
        setProfileData={setProfileData}
        errors={errors}
        setErrors={setErrors}
      />
      <TextInput
        title="قیمت(تومان)"
        name="price"
        profileData={profileData}
        setProfileData={setProfileData}
        errors={errors}
        setErrors={setErrors}
      />
      <TextInput
        title="بنگاه"
        name="realState"
        profileData={profileData}
        setProfileData={setProfileData}
        errors={errors}
        setErrors={setErrors}
      />
      <RadioList profileData={profileData} setProfileData={setProfileData}
        errors={errors} />
      <TextList
        title="امکانات رفاهی"
        profileData={profileData}
        setProfileData={setProfileData}
        pice="amenities"
        errors={errors}
        setErrors={setErrors}
      />
      <TextList
        title="قوانین"
        profileData={profileData}
        setProfileData={setProfileData}
        pice="rules"
        errors={errors}
        setErrors={setErrors}
      />

      <CustomDatePicker profileData={profileData}
        setProfileData={setProfileData} />
      {loading ? <Loader /> : profile ?
        (
          <button className={styles.submit} onClick={editHandler}>ویرایش آگهی</button>
        ) : (
          <button className={styles.submit} onClick={submitHandler}>ثبت آگهی</button>
        )
      }
      <Toaster position="top-left" reverseOrder={false} />
    </div>
  )
}

export default AddProfilePage