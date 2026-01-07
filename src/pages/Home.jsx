import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className={`pt-28 px-[4.2rem] bg-blue-400`}>
      <section className={`flex`}>
        <div className={`flex flex-col gap-10 justify-center`}>
          <div>
            <h1 className={`text-[4rem] font-bold`}>Adopt a Need</h1>
          </div>

          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure
              magnam fugit, eum voluptatibus officiis cumque voluptate quis
              consectetur obcaecati est!
            </p>
          </div>

          <div className={`flex gap-4`}>
            <Link
              className={`py-2 px-6 bg-white text-black rounded-full`}
              to={"#"}
            >
              Adopt
            </Link>
            <Link
              className={`py-2 px-6 border-2 border-white rounded-full`}
              to={"/donate"}
            >
              Donate
            </Link>
          </div>
        </div>

        <div>
          <img src="/images/child.png" alt="a child raising his hands" />
        </div>
      </section>

      <section>
        <div className={`flex justify-center`}>
          <h2 className={`2rem font-bold`}></h2>
        </div>
      </section>
    </main>
  );
};

export default Home;
