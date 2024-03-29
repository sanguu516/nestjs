import CustomIConButton from '@/components/CustomIconButton'
import { IconArrowLeft } from '@/assets/icons'
import { Grid, Heading } from '@chakra-ui/react'
import { Colors } from '@/styles/colors'
import { fontStyles } from '@/styles/font'
import { useRouter } from 'next/router'

export default function NavHeader({ title }: { title: string }) {
  const router = useRouter()

  return (
    <Grid templateColumns="1fr 1fr 1fr" zIndex={1} alignItems="center" h={14} bg={Colors.white}>
      <CustomIConButton
        size="md"
        variant="tertiary"
        icon={<IconArrowLeft color={Colors.gray[400]} />}
        my={1}
        onClick={() => router.back()}
      />
      <Heading
        color={Colors.gray[800]}
        sx={{ ...fontStyles.TitleMd }}
        whiteSpace="nowrap"
        justifySelf="center"
      >
        {title}
      </Heading>
    </Grid>
  )
}
