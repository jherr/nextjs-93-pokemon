import Head from 'next/head'
import React from 'react';
import fs from 'fs'

export async function getStaticPaths() {
  const pokemon = JSON.parse(fs.readFileSync(`./data/pokemon.json`).toString())
  return {
    paths: pokemon.map(({ name }) => `/pokemon/${name.english}`),
    fallback: false
  };
}

export async function getStaticProps(context) {
  const pokemon = JSON.parse(fs.readFileSync(`./data/pokemon.json`).toString())
  return {
    props: pokemon.find(({ name }) => name.english === context.params.name)
  }
}

export default ({ name, base }) => (
  <div>
    <Head>
      <title>{name.english}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main>
      <h2>{name.english}</h2>
      <div>
        {Object.keys(base).map((k) => (
          <div key={k} className="attribute">
            <div>{k}</div>
            <div>{base[k]}</div>
          </div>
        ))}
      </div>
    </main>
    <style jsx>{`
    .attribute {
      display: grid;
      grid-template-columns: 1fr 10fr;
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
)