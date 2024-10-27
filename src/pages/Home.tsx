import PageContainer from "../components/PageContainer";
import { logoImage } from "../assets/img";
import InputSection from "../components/InputSection";
import MainBox from "../components/MainBox";
import React, { useEffect } from 'react';
import { fetchHelloWorld } from "../services/hello-world";

function Home() {
  useEffect(() => {
    fetchHelloWorld();
}, []);

  return (
    <PageContainer>
      <section className="flex items-center min-h-screen">
        <MainBox>
          <h1 className="text-center font-bold text-3xl text-gray-800">JSON Genius</h1>
          <div className="flex gap-6">
            <img src={logoImage} alt="Logo do JSON Genius" className='w-64 h-64' />
            <p className="text-gray-700 font-semibold text-sm">JSON Genius é um aplicativo completo e intuitivo projetado para facilitar todas as suas interações com JSON. Seja você um desenvolvedor ou alguém que lida regularmente com dados em JSON, o JSON Genius oferece ferramentas poderosas para simplificar seu trabalho. Com ele, você pode rapidamente formatar JSONs bagunçados para uma visualização clara e organizada, preencher automaticamente JSONs com dados, extrair tipos e interfaces para usar em linguagens como TypeScript, além de validar a estrutura do seu JSON e detectar erros.
            </p>
          </div>

          <p className="text-gray-700 font-semibold text-sm">
            O aplicativo ainda oferece suporte para minificação, conversão entre JSON e outros formatos, e muito mais, tudo em uma interface amigável e eficiente. JSON Genius é o companheiro ideal para quem precisa lidar com JSON de maneira rápida e inteligente.
          </p>

          <InputSection />
        </MainBox>
      </section>
    </PageContainer>
  );
}

export default Home;
