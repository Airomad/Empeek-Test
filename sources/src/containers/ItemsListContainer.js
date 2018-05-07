import React from 'react';
import { itemAdd, itemDelete, itemSelect } from 'actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  min-height: 524px;
  background: #FFFFFF;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.5);
  margin-left: 32px;
  margin-top: 34px;
  flex: 1;
  height: auto;
  padding-left: 25px;
  padding-top: 8px;
  padding-right: 15px;
  padding-top: 15px;
`;

export const TitleLabel = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  font-size: 36px;
  color: #565A69;
`;

const InputRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 14px;
  margin-bottom: 18px;
`;

const Input = styled.input`
  flex: 1;
  height: 39px;
  border: 2px solid #E5E5E5;
  box-sizing: border-box;
  border-radius: 3px;
  padding-left: 11px;
  padding-right: 11px;
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  line-height: normal;
  font-size: 16px;
  color: #B3B3B3;
  &::-webkit-input-placeholder {
    color: #B3B3B3;
  }
`;

const AddButton = styled.button`
  width: 133px;
  height: 39px;
  background: #27CCC0;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  font-size: 16px;
  color: #FFFFFF;
  border: none;
  margin-left: 10px;
  cursor: pointer;
  &:hover {
    background-color: #1CAAA0;
  }
`;

const ItemRowAfter = `
  content: '';
  width: 5px;
  height: 100%;
  background-color: #FF2F5A;
  position: absolute;
  left: -28px;
  top: 0;
`;

const ItemRow = InputRow.extend`
  width: 100%;
  align-items: center;
  margin-top: 0px;
  margin-bottom: 0px;
  border-bottom: 1px solid #F2F2F2;
  position: relative;
  cursor: pointer;
  ${({ active }) => active && `
    &::after {
      ${ItemRowAfter}
    }
  `}
`;

const ItemLabelContainer = styled.div`
  flex: 1;
  height: 55px;
  display: flex;
  align-items: center;
`;

const ItemLabel = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  font-size: 16px;
  color: #000000;
`;

const CommentsCounterLabel = styled.div`
  background: #27CCC0;
  border-radius: 15px;
  padding: 2px 9px;
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  font-size: 13px;
  color: #FFFFFF;
  margin-left: 7px;
  margin-right: 7px;
`;

const DeleteButton = styled.button`
  width: 99px;
  height: 36px;
  border: 2px solid #FF6482;
  background-color: transparent;
  box-sizing: border-box;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Open Sans;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  font-size: 16px;
  color: #FF6482;
  cursor: pointer;
  &:hover {
    background-color: #FF6482;
    color: #fff;
  }
`;

const mapStateToProps = state => ({
  items: state.items.items,
  comments: state.comments.comments,
  selectedItem: state.items.selectedItem,
});

const mapDispatchToProps = dispatch => ({
  onAddItem: item => dispatch(itemAdd(item)),
  onDeleteItem: item => dispatch(itemDelete(item)),
  onSelectItem: item => dispatch(itemSelect(item)),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class ItemsListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputStr: '',
    };
  }

  addItem = () => {
    this.props.onAddItem(this.state.inputStr);
    this.setState({ inputStr: '' });
  }

  selectItem = (item) => {
    if (this.props.selectedItem !== item) {
      this.props.onSelectItem(item);
    }
  }

  renderRow = (item, index) => (
    <ItemRow key={`${item}${index}`} active={this.props.selectedItem === item}>
      <ItemLabelContainer onClick={() => this.selectItem(item)}>
        <ItemLabel>{item}</ItemLabel>
        <CommentsCounterLabel>{this.props.comments.get(item).length}</CommentsCounterLabel>
      </ItemLabelContainer>
      <DeleteButton onClick={() => this.props.onDeleteItem(item)}>Delete</DeleteButton>
    </ItemRow>
  );

  renderItems = () => {
    const items = [];
    this.props.items.forEach((item, index) => {
      items.push(this.renderRow(item, index));
    });
    return items;
  }

  render() {
    return (
      <Wrapper>
        <TitleLabel>Items</TitleLabel>
        <InputRow>
          <Input
            placeholder="Type name here..."
            value={this.state.inputStr}
            onChange={event => this.setState({ inputStr: event.target.value })}
          />
          <AddButton onClick={this.addItem}>Add new</AddButton>
        </InputRow>
        { this.renderItems() }
      </Wrapper>
    );
  }
}

ItemsListContainer.propTypes = {
  onAddItem: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onSelectItem: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.string),
  comments: PropTypes.instanceOf(Map),
  selectedItem: PropTypes.string,
};

ItemsListContainer.defaultProps = {
  selectedItem: null,
  onAddItem: undefined,
  onSelectItem: undefined,
  onDeleteItem: undefined,
  items: null,
  comments: null,
};
