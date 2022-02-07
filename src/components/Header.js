import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title, onAdd, show }) => {
  return (
    <header className='header'>
      <h1>{title}</h1>
      <Button
        color={show ? 'blue' : 'green'}
        text={show ? 'Close' : 'Add'}
        onClick={onAdd}
      />
    </header>
  )
}
// 为组件props设置默认值
Header.defaultProps = {
  title: 'Task Tracker App',
}
// 为组件props指定数据类型
Header.propTypes = {
  title: PropTypes.string,
}
export default Header
