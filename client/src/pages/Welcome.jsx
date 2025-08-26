import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
			<div className="max-w-xl w-full bg-white shadow rounded-lg p-8 text-center">
				<h1 className="text-3xl font-bold text-gray-900">Welcome!</h1>
				<p className="mt-3 text-gray-600">
					Your account has been created. You can start exploring products now.
				</p>
				<div className="mt-6 flex items-center justify-center gap-3">
					<Link to="/" className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">
						Go to Home
					</Link>
					<Link to="/profile" className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
						View Profile
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Welcome;
