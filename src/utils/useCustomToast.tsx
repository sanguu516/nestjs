import { IconDangerCircle } from '@/assets/icons'
import { Colors } from '@/styles/colors'
import { fontStyles } from '@/styles/font'
import { Flex, Text, useToast, type UseToastOptions } from '@chakra-ui/react'
import { useCallback } from 'react'

export default function useCustomToast() {
  const toast = useToast()

  const customToast = useCallback(
    (toastProps: UseToastOptions) => {
      const { title, ...rest } = toastProps

      toast({
        ...rest,
        render: () => {
          return (
            <Flex
              align="center"
              mb={2}
              p={4}
              borderRadius="1000px"
              gap={2}
              bgColor={Colors.gray[200]}
            >
              <IconDangerCircle width={24} height={24} color={Colors.red[500]} />
              <Text {...fontStyles.LabelMd} color={Colors.gray[800]}>
                {title}
              </Text>
            </Flex>
          )
        },
      })
    },
    [toast]
  )

  return customToast
}
