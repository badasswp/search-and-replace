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
            <TextControl
              label="Search"
              value={searchInput}
              onChange={(value) => setSearchInput(value)}
              placeholder="Lorem ipsum..."
              style={{ marginBottom: 2.5 }}
            />
            <TextControl
              label="Replace"
              value={replaceInput}
              onChange={(value) => setReplaceInput(value)}
              style={{ marginBottom: 10 }}
            />
            <Button
              variant="primary"
              onClick={()=>{}}
              style={{
                marginLeft: 0,
                marginRight: 7.5,
                width: 75,
                justifyContent: 'center',
              }}>
              {__('Replace')}
            </Button>
            <Button
              variant="secondary"
              onClick={closeModal}
              style={{
                marginLeft: 0,
                marginRight: 7.5,
                width: 75,
                justifyContent: 'center',
              }}>
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
