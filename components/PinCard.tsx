import { User } from "@/db_types";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";
import PinLink from "./PinLink";

interface CardTypes {
  id: string;
  img: string;
  title?: string;
  uri?: string;
  user: User
}

const PinCard: React.FC<CardTypes> = ({ ...props }) => {
  return (
    <div className="flex flex-col gap-2 group break-inside-avoid relative">
      <div className="relative">
        <Link href='' className="flex rounded-xl relative h-auto overflow-hidden">
          <Image
            src={props.img}
            alt={props.img}
            width={0}
            height={0}
            sizes="100vw"
            className="group-hover:brightness-[.65] transition-all object-cover w-full h-auto max-h-[650px] rounded-xl flex"
          />

          <div className="absolute w-full h-full opacity-0 group-hover:opacity-100 transition-all flex flex-col p-2 py-3 pt-2 z-10">
            <div className="w-full flex flex-row items-center justify-between">
              <button className="flex items-center gap-1 p-2.5">
                <p className="font-medium text-sm">Fruits</p>
                <Icon icon='ion:chevron-down' className="" />
              </button>

              <button className="flex items-center px-2.5 py-1.5 gap-1 rounded-full bg-primary text-light text-xs tracking-wide font-medium mr-[2px]">
                Save
              </button>
            </div>

            <div className="w-full flex flex-row items-center justify-between mt-auto">
              <div className="ml-auto flex flex-row items-center gap-1.5">
                <button className="p-2 rounded-full bg-light">
                  <Icon icon='tabler:share' className="text-dark" />
                </button>

                <button onClick={() => console.log('clicked')} className="p-1 rounded-full bg-light">
                  <Icon icon='iwwa:option-horizontal' className='text-dark text-2xl' />
                </button>
              </div>
            </div>
          </div>
        </Link>

        {props.uri && (
          <div className="absolute bottom-3 left-2 opacity-0 group-hover:opacity-100 transition-all z-20">
            <PinLink uri={props.uri} />
          </div>
        )}
      </div>


      {props.title && (
        <p className="text-dark font-semibold text-xs">{props.title}</p>
      )}

      <Link href='/profile' className="flex flex-row items-center gap-1.5">
        <div className="relative w-6 h-6 rounded-full overflow-hidden">
          <Image
            src={props.user.avatar ?? '/default_avatar.png'}
            alt="/default_avatar.png"
            fill
            className="object-cover"
          />
        </div>
        <p className="text-[13px] text-dark font-medium mt-1">{props.user.name}</p>
      </Link>
    </div>
  )
}

export default PinCard;