import Head from 'next/head'
import Link from 'next/link'
import fs from 'fs';

export async function getStaticProps() {
  return new Promise((resolve, reject) => {
    fs.readFile('./data/pokemon.json', (err, data) => {
      if (err) {
        reject(err);
      }
      resolve({
        props: {
          pokemon: JSON.parse(data.toString())
        }
      });
    });
  });
}

const Home = ({ pokemon }) => {
  const typeMap = {};
  pokemon.forEach(({ type, name }) => {
    type.forEach(t => {
      if (typeMap[t] === undefined) {
        typeMap[t] = [];
      }
      typeMap[t].push(name.english);
    })
  })

  return (
    <div className="container">
      <Head>
        <title>Pokemon</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          {Object.keys(typeMap).map(t => (
            <div key={t}>
              <h3>{t}</h3>
              <div className="group">
                {typeMap[t].map(name => (
                  <Link href={`/pokemon/${name}`} key={name}>
                    <a>{name}</a>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <style jsx>{`
        .group {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          font-size: small;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
            Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}

export default Home
