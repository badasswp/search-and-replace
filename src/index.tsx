import {
    __experimentalFullscreenModeClose as FullscreenModeClose,
    __experimentalMainDashboardButton as MainDashboardButton,
} from '@wordpress/edit-post';
import { __ , setLocaleData } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { Modal, TextControl, Button } from '@wordpress/components';
import { registerPlugin } from '@wordpress/plugins';
import { search } from '@wordpress/icons';

import './styles.scss';

import replace from './utils/replace';

setLocaleData( { '': {} }, 'search-replace-for-block-editor' );

const SearchReplaceForBlockEditor = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [replaceInput, setReplaceInput] = useState('');

  const openModal = () => {
    setIsModalVisible(true);
  }

  const closeModal = () => {
    setIsModalVisible(false);
  }

  const Container = ({ children, className }) => {
    return (
      <div className={className || ''}>
        {children}
      </div>
    )
  }

  return (
    <MainDashboardButton>
      <FullscreenModeClose />
      <Button
        icon={search}
        onClick={openModal}
      />
      {
        isModalVisible && (
          <Modal
            title={__('Search & Replace')}
            onRequestClose={closeModal}
            className="search-replace-modal"
          >
            <Container className="search-replace-modal__text-group">
              <TextControl
                label={__('Search')}
                value={searchInput}
                onChange={(value) => setSearchInput(value)}
                placeholder="Lorem ipsum..."
              />
              <TextControl
                label={__('Replace')}
                value={replaceInput}
                onChange={(value) => setReplaceInput(value)}
              />
            </Container>
            <Container className="search-replace-modal__button-group">
              <Button
                variant="primary"
                onClick={replace}
              >
                {__('Replace')}
              </Button>
              <Button
                variant="secondary"
                onClick={closeModal}
              >
                {__('Done')}
              </Button>
            </Container>
          </Modal>
        )
      }
    </MainDashboardButton>
  );
};

registerPlugin( 'search-replace-for-block-editor', {
  render: SearchReplaceForBlockEditor,
} );
