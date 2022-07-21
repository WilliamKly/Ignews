import { SignInButton } from '../SignInButton'
import styles from './styles.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ActiveLink } from '../ActiveLink'

export function Header() {

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="ig.news" />
        <nav>
          <ActiveLink activeClassName={styles.active} href="/">
            <a>Home</a>
          </ActiveLink>
          {/*Usar o Prefethc dentro do link posts, faz a página ser carregada antes de ser acessada*/}
          <ActiveLink activeClassName={styles.active} href="/posts">
            <a>Posts</a>
          </ActiveLink>
        </nav>

        <SignInButton />
      </div>
    </header>
  )
}