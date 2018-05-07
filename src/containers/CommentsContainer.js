import React from 'react';
import { messageAdd } from 'actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { TitleLabel } from './ItemsListContainer';

const Wrapper = styled.div`
  padding-left: 17px;
  padding-top: 8px;
  padding-right: 24px;
  padding-bottom: 24px;
  background: #FFFFFF;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.5);
  margin-left: 20px;
  margin-top: 34px;
  flex: 1;
  height: auto;
  max-height: 80%;
`;

const MessageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
  border-bottom: ${({ withoutUnderline }) => (withoutUnderline ? 'none' : '1px solid #F2F2F2')};
  padding-bottom: 21px;
  padding-top: 12px;
`;

const ImageContainer = styled.div`
  width: 53px;
  height: 52px;
  background: ${({ color }) => color || '#FF8A00'};
  margin-right: 13px;
  margin-top: 2px;
`;

const Text = styled.div`
  flex: 1;
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  line-height: 18px;
  font-size: 12px;
  color: #000000;
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
`;

const Textarea = styled.textarea`
  flex: 1;
  min-height: 72px;
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
  resize: none;
  &::-webkit-input-placeholder {
    color: #B3B3B3;
  }
`;

const mapStateToProps = state => ({
  comments: state.comments.comments,
  selectedItem: state.items.selectedItem,
});

const mapDispatchToProps = dispatch => ({
  onAddMessage: (message, item) => dispatch(messageAdd(message, item)),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class CommentsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputStr: '',
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keydownHandler);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keydownHandler);
  }

  keydownHandler = (event) => {
    if (event.keyCode === 13 && event.ctrlKey) {
      if (this.props.selectedItem) {
        this.props.onAddMessage(this.state.inputStr, this.props.selectedItem);
        this.setState({ inputStr: '' });
      }
    }
  }

  renderMessage = (message, index, withoutUnderline) => (
    <MessageWrapper key={`${message}${index}`} withoutUnderline={withoutUnderline}>
      <ImageContainer color={index % 2 === 0 ? '#FF8A00' : '#47568C'} />
      <Text>{message}</Text>
    </MessageWrapper>
  );

  renderComments = () => {
    const rows = [];
    const comments = this.props.comments.get(this.props.selectedItem);
    if (!comments) {
      return null;
    }
    comments.forEach((message, index) => {
      rows.push(this.renderMessage(message, index, (comments.length - 1 === index)));
    });
    return rows;
  }

  render() {
    return (
      <Wrapper>
        <TitleLabel style={{ marginBottom: 25 }}>Comments</TitleLabel>
        { this.renderComments() }
        <InputWrapper>
          <ImageContainer color="#E6E6E6" />
          <Textarea
            value={this.state.inputStr}
            onChange={event => this.setState({ inputStr: event.target.value })}
            onKeyPress={this.handleInputKeyPress}
          />
        </InputWrapper>
      </Wrapper>
    );
  }
}

CommentsContainer.propTypes = {
  onAddMessage: PropTypes.func,
  comments: PropTypes.instanceOf(Map),
  selectedItem: PropTypes.string,
};

CommentsContainer.defaultProps = {
  selectedItem: null,
  onAddMessage: undefined,
  comments: null,
};
