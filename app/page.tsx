export default async function Home() {
  const data = await fetch("http://localhost:3000/api").then((res) =>
    res.json()
  );

  console.log(data);

  return (
    <div>
      <h1>Home</h1>
      <p>{data.hello}</p>
    </div>
  );
}
