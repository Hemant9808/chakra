export default function SelectConcern() {
  const items = [
    {
      title1: "DAILY",
      title2: "WELLNESS",
      desc: "Multivitamins | Liver Detox | Anti Addiction Drop",
      img: "/ResourseImages/promo2Mob.jpg",
      color: "text-green-700"
    },
    {
      title1: "GYM",
      title2: "ESSENTIALS",
      desc: "Resin Shilajit | Ashwagandha Capsules",
      img: "/ResourseImages/gym.png",
      color: "text-blue-800"
    },
    {
      title1: "MENS",
      title2: "WELLNESS",
      desc: "90 Days Course",
      img: "/ResourseImages/mens.png",
      color: "text-yellow-700"
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-10">
      <h2 className="text-center text-3xl font-semibold mb-4">Select Concern</h2>

      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-8 bg-white shadow-md rounded-2xl p-6"
        >
          {/* Image */}
          <img
            src={item.img}
            alt={item.title1}
            className="w-60 h-40 md:w-72 md:h-48 object-cover rounded-xl"
          />

          {/* Text */}
          <div>
            <h3 className={`text-3xl font-extrabold leading-tight ${item.color}`}>
              {item.title1}<br />{item.title2}
            </h3>
            <p className="text-gray-600 text-md mt-1">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
