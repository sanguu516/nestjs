import CustomIConButton from '@/components/CustomIconButton'
import { IconArrowLeft } from '@/assets/icons'
import { Flex, Grid, Heading } from '@chakra-ui/react'
import { Colors } from '@/styles/colors'
import { fontStyles } from '@/styles/font'
import { useRouter } from 'next/router'
import { type ReactElement } from 'react'

export default function NavHeader({
  title,
  rightMenu,
}: {
  title?: string
  rightMenu?: ReactElement
}) {
  const router = useRouter()

  return (
    <Grid
      position="sticky"
      top={0}
      templateColumns="1fr 1fr 1fr"
      zIndex={1}
      alignItems="center"
      h={14}
      bg={Colors.white}
    >
      <CustomIConButton
        size="md"
        variant="tertiary"
        icon={<IconArrowLeft color={Colors.black} />}
        my={1}
        onClick={() => router.back()}
      />
      {title && (
        <Heading
          color={Colors.gray[800]}
          sx={{ ...fontStyles.TitleMd }}
          whiteSpace="nowrap"
          justifySelf="center"
        >
          {title}
        </Heading>
      )}
      <Flex justify="flex-end">{rightMenu}</Flex>
    </Grid>
  )
}
