import * as Popover from '@radix-ui/react-popover'

import { ArrowDownIcon } from '../icons/arrow-down'
import { Checkbox } from '../checkbox'
import { CheckboxGroup } from '../checkbox-group'

type Props = {}
export function FilterMenu(props: Props): JSX.Element {
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
        <form>
          <CheckboxGroup name="status-filter">
            <Checkbox value="draft">Draft</Checkbox>
            <Checkbox value="pending">Pending</Checkbox>
            <Checkbox value="paid">Paid</Checkbox>
          </CheckboxGroup>
        </form>
      </Popover.Content>
    </Popover.Root>
  )
}