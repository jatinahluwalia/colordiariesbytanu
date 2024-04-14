import Detail from '@/components/detail';
import { getMakeups } from '@/lib/actions/makeup.action';
import dayjs from 'dayjs';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
const Page = async () => {
  const session = await getServerSession();
  if (
    !session ||
    !(
      session.user?.email === 'ahluwalia.tanu@gmail.com' ||
      session.user?.email === 'jatin.ahluwalia.5@gmail.com'
    )
  )
    return redirect('/api/auth/signin');
  const data = await getMakeups();
  if (!data)
    return (
      <h1 className="text-xl text-red-500">No data or any error occurred</h1>
    );
  return (
    <main className="mx-auto w-[min(1400px,100%)] grow px-5 lg:px-0">
      <h1 className="mt-5 pb-10 text-5xl font-bold">Booking Details</h1>
      <div className="mt-2 flex flex-col gap-24">
        {data.map((item, index) => (
          <div
            key={`${item.name}${index}`}
            className="flex flex-col gap-5 rounded-md bg-slate-200 p-5 shadow-md"
          >
            <Detail label={'Name'} value={item.name} />
            <Detail label={'Contact'} value={item.contact} />
            <Detail label={'Occasion'} value={item.occasion} />
            <Detail
              label={'Allergies'}
              value={item.skinAllergy ? item.skinAllergy : 'No'}
            />
            <Detail label={'Alternate Contact'} value={item.alternateContact} />
            <h3 className="text-4xl font-bold text-pink-700">Makeups</h3>
            {item.makeups.map((makeup, index) => (
              <div key={makeup.date.toISOString()} className="mt-5 grid gap-5">
                <div className="grid aspect-square size-8 place-content-center rounded-full bg-blue-500 text-white">
                  {index + 1}
                </div>
                <div className="flex flex-col gap-5">
                  <Detail label="Location" value={makeup.location} />
                  <Detail
                    label="Date"
                    value={dayjs(makeup.date).format('DD MMM, YYYY')}
                  />
                  <Detail label="Ready Time" value={makeup.readyTime} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
};

export default Page;
