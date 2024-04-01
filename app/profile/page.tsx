import { UseUser } from "@/hooks/useUser"
import Image from "next/image"

const Profile = () => {
  const { user } = UseUser();

  return (
    <div className="w-full h-full bg-light">
      <div className="flex justify-center w-full">
        <div className="relative w-11 h-11 rounded-full">
          <Image
            src={user?.avatar ?? '/default_avatar.png'}
            alt="user avatar"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex gap-1">
          <p className="text-xl text-dark font-semibold">{user?.name}</p>
          <p className="text-base text-dark text-opacity-75 font-medium">@{user?.name}</p>
        </div>

        <p className="text-base text-dark font-semibold">{user?.followers ?? 0} followers · {user?.following ?? 0} following</p>

        <div className="flex flex-row items-center gap-1">
          <button></button>
        </div>
      </div>
    </div>
  )
}

export default Profile