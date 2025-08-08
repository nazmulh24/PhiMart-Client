import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import ProfileForm from "../components/Dashboard/Profile/ProfileForm";
import ProfileButton from "../components/Dashboard/Profile/ProfileButton";
import PasswordChangeForm from "../components/Dashboard/Profile/PasswordChangeForm";
import useAuthContext from "../hooks/useAuthContext";
import ErrorAlert from "../components/Alert/ErrorAlert";
import SuccessAlert from "../components/Alert/SuccessAlert";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user, updateUserProfile, changePassword, errorMsg, successMsg } =
    useAuthContext();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    // console.log(user);
    Object.keys(user).forEach((key) => setValue(key, user[key]));

    // setValue("first_name", user.first_name);
    // setValue("last_name", user.last_name);
    // setValue("email", user.email);
    // setValue("address", user.address);
    // setValue("phone_number", user.phone_number || "");
  }, [user, setValue]);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      //--> Profile update
      const profilePayload = {
        first_name: data.first_name,
        last_name: data.last_name,
        address: data.address,
        phone_number: data.phone_number,
      };
      await updateUserProfile(profilePayload);

      //--> Password Change
      if (data.current_password && data.new_password) {
        await changePassword({
          current_password: data.current_password,
          new_password: data.new_password,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card w-full max-w-2xl mx-auto bg-base-100 shadow-xl">
      <div className="card-body">
        {errorMsg && <ErrorAlert error={errorMsg} />}
        {successMsg && <SuccessAlert success={successMsg} />}
        <h2 className="card-title text-2xl mb-4">Profile Information</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <ProfileForm
            register={register}
            errors={errors}
            isEditing={isEditing}
          />

          <PasswordChangeForm
            register={register}
            errors={errors}
            watch={watch}
            isEditing={isEditing}
          />

          <ProfileButton
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            isSubmitting={isSubmitting}
          />
        </form>
      </div>
    </div>
  );
};

export default Profile;
