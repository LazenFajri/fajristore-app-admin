import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};


export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession()
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  // const handleLogout = async () => {
  //   await signOut();
  //   router.replace('/');
  // };

  useEffect(() => {
    axios.get('/api/products').then(response => {

      setProducts(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get('/api/categories').then(result => {
      setCategories(result.data)
    })
  }, []);

  const totalImagesCount = products.reduce((total, product) => total + product.images.length, 0);
  const totalPrice = products.reduce((total, product) => total + product.price, 0);

  if (session) {
    return <>
      <main
        className={` min-h-screen p-4 `}
      >
        {/* Signed in as {session.user.email} <br />
      <button onClick={() => signOut()}>Sign out</button> */}
        <header>
          <div className="mx-auto  px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="text-center sm:text-left">
                <h1 className="text-3xl font-bold text-gray-900 sm:text-3xl">
                  Selamat Datang kembali, <span className="text-green-700 font-bold">{session.user.name}</span>
                </h1>

                <p className="mt-1.5 text-md text-gray-500 max-w-md">
                  Lihat statistik tentang bisnis Anda. Juga mengelola dan menambahkan produk.
                </p>
              </div>

              <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
                <Link href={'/products'}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-500 px-5 py-3 text-gray-500 transition hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:ring"
                  type="button"
                >
                  <span className="text-sm font-medium"> Lihat Produk </span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </Link>
                <Link href={'https://my-shop-front-eclarkhalid.vercel.app/'} target="_blank"
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-orange-500 px-5 py-3 text-orange-500 transition hover:bg-orange-50 hover:text-orange-700 focus:outline-none focus:ring"
                  type="button"
                >
                  <span className="text-sm font-medium"> Lihat Toko </span>

                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>

                </Link>
                {/* <button onClick={handleLogout}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-400 px-5 py-3 text-red-500 transition hover:bg-red-50 hover:text-red-700 focus:outline-none focus:ring"
                  type="button"
                >
                  <span className="text-sm font-medium"> Logout </span>

                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                  </svg>

                </button> */}
              </div>
            </div>
          </div>
        </header>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
          <div className="h-32 rounded-lg bg-gray-200 flex items-center justify-center">
            <article
              className="flex max-md:flex-col items-end justify-between rounded-lg gap-4"
            >
              <div>
                <p className="text-sm text-gray-500">Profit</p>

                <p className="text-2xl font-medium text-gray-900">Rp. {formatPrice(totalPrice)}</p>
              </div>

              <div className="inline-flex gap-2 rounded bg-green-100 p-1 text-green-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>

                <span className="text-xs font-medium"> 67.81% </span>
              </div>
            </article>
          </div>
          <div className="h-32 rounded-lg bg-gray-200 flex items-center justify-center">
            <article
              className="flex max-md:flex-col items-end justify-between rounded-lg gap-4"
            >
              <div>
                <p className="text-sm text-gray-500">Produk</p>

                <p className="text-2xl font-medium text-gray-900">{products.length}</p>
              </div>
              <div className="inline-flex gap-2 rounded bg-green-100 p-1 text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>


                <span className="text-xs font-medium"> {products.length} </span>
              </div>
            </article>
          </div>
          <div className="h-32 rounded-lg bg-gray-200 flex items-center justify-center">
            <article
              className="flex max-md:flex-col items-end justify-between rounded-lg gap-4"
            >
              <div>
                <p className="text-sm text-gray-500">Gambar</p>

                <p className="text-2xl font-medium text-gray-900">{totalImagesCount}</p>
              </div>
              <div className="inline-flex gap-2 rounded bg-green-100 p-1 text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>


                <span className="text-xs font-medium"> {totalImagesCount} </span>
              </div>
            </article>
          </div>
          <div className="h-32 rounded-lg bg-gray-200 flex items-center justify-center">
            <article
              className="flex max-md:flex-col items-end justify-between rounded-lg gap-4"
            >
              <div>
                <p className="text-sm text-gray-500">Kategori</p>

                <p className="text-2xl font-medium text-gray-900">{categories.length}</p>
              </div>
              <div className="inline-flex gap-2 rounded bg-green-100 p-1 text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
                </svg>


                <span className="text-xs font-medium"> {categories.length} </span>
              </div>
            </article>

          </div>
        </div>
      </main>
    </>
  }

  return <>

    <main
      className={`flex min-h-screen flex-col items-center justify-center p-5 text-center `}
    >
      <div className="max-w-xl lg:max-w-3xl">

        <h1
          className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl"
        >
          <span className="sr-only">Home</span>
              <svg width="350" height="222" viewBox="0 0 172 82" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-3 flex">
                <path d="M13.752 11.024L10.044 11.06C8.364 11.132 7.524 11.324 7.524 11.636V20.636C7.524 20.876 7.644 20.996 7.884 20.996H13.248C13.824 20.996 14.208 20.732 14.4 20.204C14.616 19.652 14.724 18.644 14.724 17.18L15.912 17L15.84 21.788L15.912 26.216L14.724 26.396C14.724 24.98 14.64 24.068 14.472 23.66C14.304 23.252 13.896 23.048 13.248 23.048H7.884C7.644 23.048 7.524 23.156 7.524 23.372V31.796C7.524 32.516 7.764 32.984 8.244 33.2C8.748 33.416 9.792 33.524 11.376 33.524L11.736 35.072L6.768 35C6.456 35 4.716 35.036 1.548 35.108L1.26 33.524C2.604 33.38 3.42 33.248 3.708 33.128C4.02 32.984 4.2 32.648 4.248 32.12V12.32C4.248 11.816 4.08 11.48 3.744 11.312C3.408 11.144 2.628 11.012 1.404 10.916L1.08 9.332L5.58 9.44H11.016L19.908 9.476C20.076 9.836 20.16 10.64 20.16 11.888C20.16 13.136 20.1 14.42 19.98 15.74L18.828 15.632C18.54 13.928 18.012 12.74 17.244 12.068C16.476 11.372 15.312 11.024 13.752 11.024ZM24.991 34.856L21.247 35L20.887 33.344H21.103C22.207 33.224 23.047 32.924 23.623 32.444C24.223 31.94 24.727 31.124 25.135 29.996L32.767 9.44H34.495L42.991 30.572C43.495 31.748 43.939 32.516 44.323 32.876C44.731 33.236 45.379 33.416 46.267 33.416L46.663 35C44.791 34.88 43.099 34.82 41.587 34.82C40.099 34.82 38.647 34.88 37.231 35L36.907 33.452H37.051C38.947 33.428 39.895 33.092 39.895 32.444C39.895 32.132 39.031 29.996 37.303 26.036H28.339L26.575 30.932C26.503 31.22 26.467 31.472 26.467 31.688C26.467 32.192 26.695 32.576 27.151 32.84C27.607 33.104 28.387 33.272 29.491 33.344L29.923 35L24.991 34.856ZM32.479 14.66L29.023 24.164H36.475L32.479 14.66ZM48.6281 9.332L53.1641 9.44C53.1881 9.44 54.7841 9.404 57.9521 9.332L58.2401 10.916C56.7281 11.06 55.8041 11.204 55.4681 11.348C55.1321 11.468 54.9641 11.792 54.9641 12.32V32.984C54.9641 35.528 54.3161 37.772 53.0201 39.716C51.7481 41.684 49.9841 43.184 47.7281 44.216C47.5361 44.216 47.3681 44.132 47.2241 43.964C46.9601 43.628 46.8281 43.424 46.8281 43.352C46.8281 43.28 46.8761 43.208 46.9721 43.136C48.8921 41.768 50.1521 40.4 50.7521 39.032C51.3761 37.688 51.6881 35.492 51.6881 32.444V12.32C51.6881 11.816 51.5201 11.48 51.1841 11.312C50.8481 11.144 50.1041 11.012 48.9521 10.916L48.6281 9.332ZM59.8613 9.332L64.1813 9.44L69.6893 9.296C72.3293 9.296 74.4893 9.86 76.1693 10.988C77.8493 12.116 78.6893 13.844 78.6893 16.172C78.6893 19.604 76.9493 21.92 73.4693 23.12C73.9733 23.792 74.7653 24.872 75.8453 26.36C78.1733 29.672 79.7453 31.712 80.5613 32.48C81.4013 33.248 82.3613 33.68 83.4413 33.776L83.9093 35.036L81.2453 34.928L77.6453 35C77.1893 34.376 75.9772 32.576 74.0093 29.6C72.0653 26.624 70.7573 24.728 70.0853 23.912C69.9893 23.816 69.8573 23.768 69.6893 23.768H66.2333V32.12C66.2333 32.6 66.4493 32.936 66.8813 33.128C67.3133 33.296 68.1413 33.428 69.3652 33.524L69.6893 35.108C66.5933 35.036 65.0093 35 64.9373 35L60.3293 35.108L60.0413 33.524C61.3853 33.38 62.2013 33.248 62.4893 33.128C62.8013 32.984 62.9573 32.648 62.9573 32.12V12.32C62.9573 11.84 62.7773 11.516 62.4173 11.348C62.0813 11.156 61.3373 11.012 60.1853 10.916L59.8613 9.332ZM66.2333 11.6V22.04C66.7853 22.112 67.5773 22.148 68.6093 22.148C73.0493 22.148 75.2693 20.168 75.2693 16.208C75.2693 14.48 74.7053 13.184 73.5773 12.32C72.4493 11.432 70.9853 10.988 69.1853 10.988C67.6253 10.988 66.7373 11.06 66.5213 11.204C66.3293 11.324 66.2333 11.456 66.2333 11.6ZM85.574 9.332L90.11 9.44C90.134 9.44 91.73 9.404 94.898 9.332L95.186 10.916C93.674 11.06 92.75 11.204 92.414 11.348C92.078 11.468 91.91 11.792 91.91 12.32V32.12C91.91 32.624 92.078 32.96 92.414 33.128C92.75 33.296 93.494 33.428 94.646 33.524L94.97 35.108L90.434 35C90.41 35 88.814 35.036 85.646 35.108L85.358 33.524C86.87 33.38 87.794 33.248 88.13 33.128C88.466 32.984 88.634 32.648 88.634 32.12V12.32C88.634 11.816 88.466 11.48 88.13 11.312C87.794 11.144 87.05 11.012 85.898 10.916L85.574 9.332Z" fill="black"/>
                <path d="M58.756 68.632C60.412 68.632 61.684 68.212 62.572 67.372C63.484 66.532 63.94 65.512 63.94 64.312C63.94 63.112 63.496 62.092 62.608 61.252C61.744 60.388 60.676 59.644 59.404 59.02C58.156 58.396 56.896 57.748 55.624 57.076C54.376 56.404 53.308 55.516 52.42 54.412C51.556 53.284 51.124 51.976 51.124 50.488C51.124 48.352 51.892 46.744 53.428 45.664C54.964 44.56 56.788 44.008 58.9 44.008C61.612 44.008 63.94 44.464 65.884 45.376C66.052 45.736 66.136 46.684 66.136 48.22C66.136 49.732 66.088 50.872 65.992 51.64L64.876 51.568C64.78 49.888 64.192 48.496 63.112 47.392C62.056 46.264 60.616 45.7 58.792 45.7C57.496 45.7 56.428 46.036 55.588 46.708C54.772 47.356 54.364 48.268 54.364 49.444C54.364 50.836 55.216 52.048 56.92 53.08C57.664 53.536 58.492 53.992 59.404 54.448C60.316 54.904 61.228 55.396 62.14 55.924C63.052 56.428 63.88 56.992 64.624 57.616C66.328 59.008 67.18 60.784 67.18 62.944C67.18 65.08 66.436 66.868 64.948 68.308C63.46 69.724 61.492 70.432 59.044 70.432C56.596 70.432 54.052 69.94 51.412 68.956C51.292 68.596 51.124 67.708 50.908 66.292C50.692 64.852 50.536 63.64 50.44 62.656L52.096 62.404C53.056 66.556 55.276 68.632 58.756 68.632ZM85.4258 46.06H82.5458V67.048C82.5458 67.552 82.7378 67.888 83.1218 68.056C83.5298 68.224 84.4418 68.356 85.8578 68.452L86.1818 70.036C83.0858 69.964 81.4298 69.928 81.2138 69.928C80.9978 69.928 79.3058 69.964 76.1378 70.036L75.8498 68.452C77.4578 68.308 78.4298 68.176 78.7658 68.056C79.1018 67.912 79.2698 67.576 79.2698 67.048V46.06H77.0378C75.8378 46.06 74.9498 46.12 74.3738 46.24C72.7178 46.576 71.6618 48.052 71.2058 50.668L70.1978 50.74C70.0298 49.9 69.9458 48.748 69.9458 47.284C69.9458 45.796 70.0298 44.764 70.1978 44.188C70.7258 44.356 71.6738 44.44 73.0418 44.44H89.2058C90.5978 44.44 91.5338 44.356 92.0138 44.188C92.1098 45.22 92.1578 46.324 92.1578 47.5C92.1578 48.676 92.0618 49.756 91.8698 50.74L90.7898 50.632C90.5738 48.952 90.0698 47.776 89.2778 47.104C88.4858 46.408 87.2018 46.06 85.4258 46.06ZM107.769 70.432C103.977 70.432 100.857 69.256 98.4089 66.904C95.9609 64.552 94.7369 61.48 94.7369 57.688C94.7369 53.896 96.0329 50.668 98.6249 48.004C101.241 45.34 104.445 44.008 108.237 44.008C112.029 44.008 115.125 45.208 117.525 47.608C119.925 49.984 121.125 53.08 121.125 56.896C121.125 60.712 119.853 63.928 117.309 66.544C114.765 69.136 111.585 70.432 107.769 70.432ZM108.777 68.632C111.441 68.632 113.529 67.66 115.041 65.716C116.577 63.748 117.345 61.276 117.345 58.3C117.345 53.332 115.857 49.72 112.881 47.464C111.345 46.288 109.473 45.7 107.265 45.7C104.601 45.7 102.477 46.708 100.893 48.724C99.3089 50.74 98.5169 53.224 98.5169 56.176C98.5169 59.488 99.3209 62.344 100.929 64.744C101.721 65.944 102.789 66.892 104.133 67.588C105.501 68.284 107.049 68.632 108.777 68.632ZM123.662 44.332L127.982 44.44L133.49 44.296C136.13 44.296 138.29 44.86 139.97 45.988C141.65 47.116 142.49 48.844 142.49 51.172C142.49 54.604 140.75 56.92 137.27 58.12C137.774 58.792 138.566 59.872 139.646 61.36C141.974 64.672 143.546 66.712 144.362 67.48C145.202 68.248 146.162 68.68 147.242 68.776L147.71 70.036L145.046 69.928L141.446 70C140.99 69.376 139.778 67.576 137.81 64.6C135.866 61.624 134.558 59.728 133.886 58.912C133.79 58.816 133.658 58.768 133.49 58.768H130.034V67.12C130.034 67.6 130.25 67.936 130.682 68.128C131.114 68.296 131.942 68.428 133.166 68.524L133.49 70.108C130.394 70.036 128.81 70 128.738 70L124.13 70.108L123.842 68.524C125.186 68.38 126.002 68.248 126.29 68.128C126.602 67.984 126.758 67.648 126.758 67.12V47.32C126.758 46.84 126.578 46.516 126.218 46.348C125.882 46.156 125.138 46.012 123.986 45.916L123.662 44.332ZM130.034 46.6V57.04C130.586 57.112 131.378 57.148 132.41 57.148C136.85 57.148 139.07 55.168 139.07 51.208C139.07 49.48 138.506 48.184 137.378 47.32C136.25 46.432 134.786 45.988 132.986 45.988C131.426 45.988 130.538 46.06 130.322 46.204C130.13 46.324 130.034 46.456 130.034 46.6ZM161.831 46.024L157.763 46.06C156.083 46.132 155.243 46.324 155.243 46.636V55.636C155.243 55.876 155.363 55.996 155.603 55.996H161.327C161.903 55.996 162.287 55.732 162.479 55.204C162.695 54.652 162.803 53.644 162.803 52.18L163.991 52L163.919 56.788L163.991 61.216L162.803 61.396C162.803 59.98 162.719 59.068 162.551 58.66C162.383 58.252 161.975 58.048 161.327 58.048H155.603C155.363 58.048 155.243 58.156 155.243 58.372V65.932C155.243 66.988 155.459 67.66 155.891 67.948C156.323 68.212 157.271 68.344 158.735 68.344H162.227C164.051 68.344 165.479 67.924 166.511 67.084C167.543 66.22 168.359 64.9 168.959 63.124L170.183 63.34C170.183 63.772 169.871 64.996 169.247 67.012C168.623 69.004 168.179 70 167.915 70L158.735 70.072C158.111 70.072 156.287 70.048 153.263 70L149.267 70.108L148.979 68.524C150.323 68.38 151.139 68.248 151.427 68.128C151.739 67.984 151.919 67.648 151.967 67.12V47.32C151.967 46.816 151.799 46.48 151.463 46.312C151.127 46.144 150.347 46.012 149.123 45.916L148.799 44.332L153.299 44.44H159.095L167.987 44.476C168.155 44.836 168.239 45.64 168.239 46.888C168.239 48.136 168.179 49.42 168.059 50.74L166.907 50.632C166.619 48.928 166.091 47.74 165.323 47.068C164.555 46.372 163.391 46.024 161.831 46.024Z" fill="black"/>
              </svg>
          Selamat datang
        </h1>

        <p className="mt-4 leading-relaxed text-gray-500 max-w-sm">
          Website ini hanya dapat diakses oleh admin saja. Tambahkan produk baru dan kelola database.
        </p>
        <div className="col-span-6 sm:flex sm:items-center sm:gap-4 my-4 flex items-center justify-center">
          <button
            disabled={isLoading}
            onClick={() => {
              setIsLoading(true);
              signIn('google');
            }}
            className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
          >
            Login With Google
          </button>
        </div>
      </div>
    </main>
  </>
}
