import { useForm } from "react-hook-form";
import { useState } from "react";
import ProfileForm from "../components/Dashboard/Profile/ProfileForm";
import ProfileButton from "../components/Dashboard/Profile/ProfileButton";
import PasswordChangeForm from "../components/Dashboard/Profile/PasswordChangeForm";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <div className="card w-full max-w-2xl mx-auto bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-4">Profile Information</h2>

        <form>
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

          <ProfileButton isEditing={isEditing} setIsEditing={setIsEditing} />
        </form>
      </div>
    </div>
  );
};

export default Profile;
