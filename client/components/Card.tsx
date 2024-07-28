const Card = ({
  title,
  description,
  buttonText,
  buttonColor,
  onClick,
}: {
  title: string;
  description: JSX.Element;
  buttonText: string;
  buttonColor: string;
  onClick: any;
}) => {
  return (
    <div className="carousel-item w-full p-2">
      <div className="card bg-[#282a36] w-full shadow-lg rounded-box p-6 h-[40vh] flex flex-col justify-evenly">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <div className="text-white">{description}</div>
        <button
          className={`mt-4 ${buttonColor} text-white w-32 mx-auto py-2 px-4 rounded shadow-lg hover:brightness-110 transition`}
          onClick={onClick}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Card;
