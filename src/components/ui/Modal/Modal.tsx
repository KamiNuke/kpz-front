import { Dialog } from '@headlessui/react';
import type React from "react";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	message: string;
}

const Modal = ({ isOpen, onClose, onConfirm, message }: ModalProps): React.ReactElement => {
	return (
		<Dialog className="relative z-50" open={isOpen} onClose={onClose}>
			<div aria-hidden="true" className="fixed inset-0 bg-black/30" />
			<div className="fixed inset-0 flex items-center justify-center p-4">
				<Dialog.Panel className="max-w-sm rounded bg-white p-6">
					<Dialog.Title className="text-lg font-medium">{message}</Dialog.Title>
					<div className="mt-4 flex justify-end space-x-2">
						<button
							className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
							onClick={onClose}
						>
							Cancel
						</button>
						<button
							className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
							onClick={onConfirm}
						>
							Apply
						</button>
					</div>
				</Dialog.Panel>
			</div>
		</Dialog>
	);
};

export default Modal;