import {
    __experimentalFullscreenModeClose as FullscreenModeClose,
    __experimentalMainDashboardButton as MainDashboardButton,
} from '@wordpress/edit-post';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { Modal, TextControl, Button } from '@wordpress/components';
import { registerPlugin } from '@wordpress/plugins';
import { search } from '@wordpress/icons';

import './styles.scss';

import replace from './utils/replace';

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

  const Container = ({ children }) => {
    return (
      <div className="search-replace-modal-container">
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
            <Container>
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
          </Modal>
        )
      }
    </MainDashboardButton>
  );
};

registerPlugin( 'search-replace-for-block-editor', {
  render: SearchReplaceForBlockEditor,
} );
