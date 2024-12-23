import type { NextPage } from 'next'

const Home: NextPage = () => (
  <main className="mx-auto mt-16 mb-8 grid max-w-screen-lg gap-8 p-4 lg:grid-cols-[auto_auto]">
    <section>
      <h1 className="mt-2 mb-8 text-4xl font-bold">
        Good for health, bad for...
      </h1>
      <p className="my-5 text-gray-800/90 italic dark:text-neutral-300">
        tl;dr: Monads...
      </p>

      <p className="my-5">
        My first computer was an IBM ThinkPad A31, running a Debian-based
        operating system. Since then, I&apos;ve been a dedicated Linux user,
        exploring various distributions like Arch, Void, openSUSE, and Fedora
        Linux. Among them, Arch Linux is the one I&apos;ve spent the most time
        with.
      </p>
      <p className="my-5">
        In 2020, inspired by the many developers and all the cool tools build
        around Nix, I embark on daily driving NixOS. While still learning the
        ropes, I&apos;m eager to share my experiences as a web developer using
        open-source technologies.
      </p>
      <p className="my-5">
        I began my web development journey by learning Python and Flask. After
        experimenting with Java&apos;s Spring Framework, I ultimately
        transitioned to TypeScript and Node.js.
      </p>
      <p className="my-5">
        My journey into the world of modern web development began with Angular
        2, which led me to discover TypeScript. Previously, I had explored
        functional programming through my experience with xmonad, a
        Haskell-based window manager. This background helped me appreciate
        ReactJS&apos;s functional approach.
      </p>
    </section>

    <section>
      <h2 className="mt-4 mb-8 text-2xl font-bold">What I&apos;m Up To</h2>
      <ul className="flex list-[hiragana-iroha] flex-col gap-2 pl-8">
        <li>
          Learning{' '}
          <a
            className="font-bold underline decoration-dotted underline-offset-4"
            href="https://effect.website/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Effect-TS.
          </a>
        </li>
        <li>Reading The Origins of Totalitarianism.</li>
        <li>
          Playing Type Lumina;{' '}
          <a
            className="font-bold underline decoration-dotted underline-offset-4"
            href="https://meltyblood.typelumina.com/resources/img/command/meltyblood_typelumina_neco-arc_command_lists_en.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Neco-Arc
          </a>{' '}
          and{' '}
          <a
            className="font-bold underline decoration-dotted underline-offset-4"
            href="https://meltyblood.typelumina.com/resources/img/command/meltyblood_typelumina_kohaku_command_lists_en.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Kohaku.
          </a>
        </li>
      </ul>
    </section>
  </main>
)

export default Home
