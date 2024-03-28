import PhotoProfile from "./upload";
import ProfileForm from "./form";

export default async function Profile() {
  return (
    <>
      <section className="bg-ct-blue-600  min-h-screen pt-20">
        <div className="max-w-4xl mx-auto bg-ct-dark-100 rounded-md h-[20rem] flex justify-center items-center">
          <div>
            <p className="mb-3 text-5xl text-center font-semibold">
              Profile Page
            </p>
            <div className="flex items-center gap-8">
              <PhotoProfile />

              <div className="mt-8">
                <ProfileForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
