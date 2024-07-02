import { OAuth, type Props } from 'app/oauth'

// export const getServerSideProps = (context: { query: { code: string } }) => {
//   const { code } = context?.query

//   return {
//     props: {
//       code,
//     },
//   }
// }

export async function generateStaticParams(context: { params: { code: string } }) {
  const { code } = context.params

  return {
    props: {
      code,
    },
  }
}

export default function OAuthPage({ params }: Props) {
  return <OAuth params={{ code: params.code }} />
}
