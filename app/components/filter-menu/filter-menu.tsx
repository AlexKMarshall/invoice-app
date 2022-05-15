import * as Popover from '@radix-ui/react-popover'

import { ArrowDownIcon } from '../icons/arrow-down'
import { Checkbox } from '../checkbox'
import { CheckboxGroup } from '../checkbox-group'
import { ReactNode } from 'react'

type FormProps = {
  children: ReactNode
}
type Form = React.FC<FormProps>

type Props = {
  Form: Form
}
export function FilterMenu({ Form }: Props): JSX.Element {
  return (
    <Popover.Root>
      <Popover.Trigger className="text-strong font-weight-bold radius-xs filter-menu-trigger">
        <span>
          Filter<span className="mobile-hidden"> by status</span>
        </span>
        <ArrowDownIcon className="color-primary" />
      </Popover.Trigger>
      <Popover.Content
        className="surface5 radius-m padding-6 font-weight-bold filter-menu-content"
        sideOffset={20}
      >
        <Form>
          <CheckboxGroup name="status">
            <Checkbox value="draft">Draft</Checkbox>
            <Checkbox value="pending">Pending</Checkbox>
            <Checkbox value="paid">Paid</Checkbox>
          </CheckboxGroup>
        </Form>
      </Popover.Content>
    </Popover.Root>
  )
}
