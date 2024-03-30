import { IconDangerCircle, IconDeleteCircle, IconHide, IconShow } from '@/assets/icons'
import { Colors } from '@/styles/colors'
import { fontStyles } from '@/styles/font'
import debounce, { DEBOUNCE_DELAY } from '@/utils/debounce'
import { Box, Flex, Input, Text, type InputProps } from '@chakra-ui/react'
import React, { cloneElement, useCallback, useEffect, useRef, useState } from 'react'
import CustomIConButton from './CustomIconButton'

interface CustomInputProps extends InputProps {
  supportingText?: string
  isSensitive?: boolean
  isInvalid?: boolean
  isDisabled?: boolean
  noIcon?: boolean
  initializeValue?: () => void
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

interface OnClicks {
  handleShowHide: () => void
  handleDelete: () => void
}

interface IconProps {
  isInvalid: boolean
  isSensitive: boolean
  isShow: boolean
  onClicks: OnClicks
}

function Icons({ isInvalid, isSensitive, isShow, onClicks }: IconProps) {
  let icon, handleOnClick

  if (isInvalid) {
    icon = <IconDangerCircle />
  } else if (isSensitive) {
    icon = isShow ? <IconShow /> : <IconHide />
    handleOnClick = onClicks.handleShowHide
  } else {
    icon = <IconDeleteCircle />
    handleOnClick = onClicks.handleDelete
  }

  return (
    <CustomIConButton
      size="sm"
      icon={cloneElement(icon, {
        width: '1.5rem',
        height: '1.5rem',
        color: isInvalid ? Colors.red[600] : Colors.gray[400],
      })}
      variant="tertiary"
      isDisabled={isInvalid}
      onClick={handleOnClick}
      cursor={isInvalid ? 'default' : 'pointer'}
    ></CustomIConButton>
  )
}

export default function CustomInput({
  supportingText,
  isSensitive,
  initializeValue,
  isInvalid,
  isDisabled,
  onChange,
  noIcon = false,
  ...rest
}: CustomInputProps) {
  const [value, setValue] = useState<string>('')
  const [isShow, setIsShow] = useState<boolean>(false)
  const [onFocus, setOnFocus] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!(isSensitive && inputRef.current)) return
    if (isShow) {
      inputRef.current.type = 'text'
    } else {
      inputRef.current.type = 'password'
    }
  }, [isShow])

  const handleTyping: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value)
  }

  const handleInput: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    handleTyping(e)
    onChange?.(e)
  }, [])

  const handleShowHide = () => {
    setIsShow((prev) => !prev)
  }

  const handleFocus = () => {
    setOnFocus((prev) => !prev)
  }

  const handleDelete = () => {
    setValue('')
    if (inputRef.current) {
      inputRef.current.value = ''
    }
    initializeValue?.()
  }

  const handleIconClicks = { handleShowHide, handleDelete }

  return (
    <Box position="relative">
      <Flex
        align="center"
        {...rest}
        w={rest.w ?? 328}
        h={rest.h ?? 12}
        px={rest.px ?? 3}
        py={rest.py ?? 2.875}
        bg={isDisabled ? Colors.gray[25] : Colors.white}
        border="1px solid"
        borderRadius={8}
        borderColor={isInvalid ? Colors.red[600] : Colors.gray[300]}
        gap={4}
      >
        <Box as="label" w="100%">
          {onFocus && value && (
            <Text
              color={isInvalid ? Colors.red[600] : Colors.indigo[600]}
              sx={{ ...fontStyles.BodySm }}
            >
              {rest.placeholder}
            </Text>
          )}
          <Input
            ref={inputRef}
            id={rest.id}
            type={rest.type}
            name={rest.name}
            defaultValue={rest.defaultValue}
            placeholder={rest.placeholder}
            onChange={debounce(handleInput, DEBOUNCE_DELAY)}
            onFocus={handleFocus}
            onBlur={handleFocus}
            isInvalid={isInvalid}
            isDisabled={isDisabled ?? false}
            h="100%"
            p={0}
            border="none"
            style={{ caretColor: Colors.indigo[600] }}
            bg={isDisabled ? Colors.gray[25] : Colors.white}
            color={isInvalid ? Colors.red[600] : Colors.gray[800]}
            _placeholder={{ color: Colors.gray[300] }}
            _disabled={{ color: Colors.gray[300] }}
            _focusVisible={{
              borderColor: 'none',
            }}
            _invalid={{
              boxShadow: 'none',
            }}
          />
        </Box>
        {!noIcon && (
          <Icons
            isInvalid={isInvalid ?? false}
            isSensitive={isSensitive ?? false}
            isShow={isShow}
            onClicks={handleIconClicks}
          />
        )}
      </Flex>
      {isInvalid && (
        <Text
          width="100%"
          position="absolute"
          mt={1}
          px={4}
          color={isInvalid ? Colors.red[600] : isDisabled ? Colors.gray[300] : Colors.gray[400]}
          sx={{ ...fontStyles.Caption }}
        >
          {supportingText}
        </Text>
      )}
    </Box>
  )
}
