import BookingForm from '@/components/form/BookingForm';
import Image from 'next/image';

const Page = () => {
  return (
    <main className="grow px-5 md:px-0">
      <div className="relative mx-auto mt-5 w-[min(600px,100%)] px-5">
        <h1 className="text-center text-4xl font-bold">
          Thank you for choosing
        </h1>
        <Image
          src={'/logo.png'}
          alt="logo"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full"
          priority
        />
        <p className="text-center text-gray-400">
          Please fill up the below details to proceed further with your makeup
          booking with us
        </p>
      </div>
      <BookingForm />
    </main>
  );
};

export default Page;
