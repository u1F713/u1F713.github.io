import clsx from 'clsx'
import type { NextPage } from 'next'
import Mark from './components/Mark.tsx'

const Home: NextPage = () => (
  <div
    className={clsx(
      'grid max-w-screen-lg md:text-lg lg:grid-cols-[auto_auto] lg:gap-16',
      'grid-flow-row justify-center *:max-w-2xl'
    )}
  >
    <section>
      <h1 className="my-4 text-3xl font-bold lg:mb-8 lg:text-4xl">
        Good for health, bad for...
      </h1>
      <div className="*:my-5">
        <p className="text-dn-color-200/60 italic">tl;dr: Monads...</p>
        <p>
          My first computer was an IBM ThinkPad A31, running a Debian-based
          operating system. Since then, I&apos;ve been a dedicated Linux user,
          exploring various distributions like Arch, Void, openSUSE, and Fedora
          Linux. Among them, Arch Linux is the one I&apos;ve spent the most
          time with.
        </p>
        <p>
          In 2020, inspired by the many developers and all the cool tools build
          around Nix, I embark on daily driving NixOS. While still learning the
          ropes, I&apos;m eager to share my experiences as a web developer
          using open-source technologies.
        </p>
        <p>
          My journey into web development began with Angular 2, which led me to
          discover TypeScript. Previously, I had explored functional
          programming through my experience with xmonad, a Haskell-based window
          manager. This background helped me appreciate ReactJS&apos;s
          functional approach.
        </p>
      </div>
    </section>

    <section>
      <h2 className="my-4 text-2xl font-bold lg:mb-8">What I&apos;m Up To</h2>
      <ul className="flex list-[hiragana-iroha] flex-col gap-2 pl-8">
        <li>
          Learning{' '}
          <a
            href="https://effect.website/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Mark>Effect-TS.</Mark>
          </a>
        </li>
        <li>Reading Between Past and Future</li>
        <li>
          Playing Type Lumina:{' '}
          <a
            href="https://meltyblood.typelumina.com/resources/img/command/meltyblood_typelumina_neco-arc_command_lists_en.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Mark>Neco-Arc</Mark>
          </a>{' '}
          and{' '}
          <a
            href="https://meltyblood.typelumina.com/resources/img/command/meltyblood_typelumina_kohaku_command_lists_en.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Mark>Kohaku.</Mark>
          </a>
        </li>
      </ul>
    </section>
  </div>
)

export default Home
