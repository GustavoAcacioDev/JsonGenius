import React from 'react';
import { Check, Code, GitCompare, Hammer, Search, Zap } from "lucide-react";
import FeaturesCard, { TFeaturesCardProp } from '../components/FeaturesCard';
import Header from '../components/Header/Header';
import { Button } from '../components/ui/shadcn/Button';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../Router/PrivateRoute';

const featuresList: TFeaturesCardProp[] = [
  {
    title: 'Validar JSON',
    description: 'Certifique-se de que seu JSON esteja formatado corretamente e livre de erros de sintaxe.',
    color: 'green',
    Icon: Check
  },
  {
    title: 'Formatar JSON',
    description: 'Embeleze seu JSON para melhorar a legibilidade e facilitar a edição.',
    color: 'yellow',
    Icon: Zap
  },
  {
    title: 'Minificar JSON',
    description: 'Compacte seu JSON removendo espaços em branco e comentários desnecessários.',
    color: 'blue',
    Icon: Hammer
  },
  {
    title: 'Transformar JSON',
    description: 'Aplique transformações complexas usando expressões JSONPath.',
    color: 'purple',
    Icon: Code
  },
  {
    title: 'Analisar JSON',
    description: 'Gere esquemas e obtenha insights sobre sua estrutura JSON.',
    color: 'indigo',
    Icon: Search
  },
  {
    title: 'Comparar JSON',
    description: 'Identifique diferenças entre dois objetos JSON de forma rápida e fácil.',
    color: 'red',
    Icon: GitCompare
  },
]

function Home() {
  return isAuthenticated() ? <Navigate to="/chat" /> : (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow container mx-auto px-6 py-8">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">A solução principal para seus problemas com JSON!</h2>
          <p className="text-xl text-muted-foreground mb-6">Valide, formate, compare e analise, tudo com facilidade!</p>
          <Button asChild size="md">
            <a href="/chat">Tente agora</a>
          </Button>
        </section>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {
            featuresList.map((feature) => (
              <FeaturesCard Icon={feature.Icon} color={feature.color} description={feature.description} title={feature.title} />
            ))
          }
        </section>

        <section className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Pronto para solucionar seus problemas com JSON?</h2>
          <p className="text-lg text-muted-foreground mb-6">Junte-se a uma comunidade de desenvolvedores que já solucionam desafios com JSON de maneira eficiente com o JSON Problem Solver.</p>
          <div className="flex justify-center space-x-4">
            <Button asChild variant="default">
              <a href="/sign-up">Cadastrar-se</a>
            </Button>
            <Button asChild variant="outline">
              <a href="/login">Login</a>
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-muted py-6">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            © 2023 JSON Problem Solver. All rights reserved.
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="/privacy" className="text-sm text-muted-foreground hover:underline">Privacy Policy</a></li>
              <li><a href="/terms" className="text-sm text-muted-foreground hover:underline">Terms of Service</a></li>
              <li><a href="/faq" className="text-sm text-muted-foreground hover:underline">FAQ</a></li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default Home;
